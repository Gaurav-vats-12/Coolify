const packs = require('../../../buildPacks')
const { saveAppLog } = require('../../logging')
const Deployment = require('../../../models/Deployment')

module.exports = async function (configuration) {
  const { id, organization, name, branch } = configuration.repository
  const { domain } = configuration.publish
  const deployId = configuration.general.deployId

  const execute = packs[configuration.build.pack]
  if (execute) {
    await Deployment.findOneAndUpdate(
      { repoId: id, branch, deployId, organization, name, domain },
      { repoId: id, branch, deployId, organization, name, domain, progress: 'inprogress' })
    await saveAppLog('### Building application.', configuration)
    await execute(configuration)
    await saveAppLog('### Building done.', configuration)
  } else {
    try {
      await Deployment.findOneAndUpdate(
        { repoId: id, branch, deployId, organization, name, domain },
        { repoId: id, branch, deployId, organization, name, domain, progress: 'failed' })
    } catch (error) {
      // Hmm.
    }
    throw new Error('No buildpack found.')
  }
}
