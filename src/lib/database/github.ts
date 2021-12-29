import { decrypt, encrypt } from "$lib/crypto"
import { prisma, PrismaErrorHandler } from "./common"

export async function addInstallation({ gitSourceId, installation_id }) {
    try {
        const source = await prisma.gitSource.findUnique({ where: { id: gitSourceId }, include: { githubApp: true } })
        await prisma.githubApp.update({ where: { id: source.githubAppId }, data: { installationId: Number(installation_id) } })
        return { status: 201 }
    } catch (e) {
        throw PrismaErrorHandler(e)
    }
}

export async function getUniqueGithubApp({ githubAppId }) {
    try {
        let body = await prisma.githubApp.findUnique({ where: { id: githubAppId } })
        if (body.privateKey) body.privateKey = decrypt(body.privateKey)
        return { ...body }
    } catch (e) {
        throw PrismaErrorHandler(e)
    }
}

export async function createGithubApp({ id, client_id, slug, client_secret, pem, webhook_secret, state }) {
    try {
        const encryptedClientSecret = encrypt(client_secret)
        const encryptedWebhookSecret = encrypt(webhook_secret)
        const encryptedPem = encrypt(pem)
        await prisma.githubApp.create({
            data: {
                appId: id,
                name: slug,
                clientId: client_id,
                clientSecret: encryptedClientSecret,
                webhookSecret: encryptedWebhookSecret,
                privateKey: encryptedPem,
                gitSource: { connect: { id: state } }
            }
        })
        return { status: 201 }
    } catch (e) {
        throw PrismaErrorHandler(e)
    }
}



