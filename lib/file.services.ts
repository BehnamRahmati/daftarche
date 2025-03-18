import { S3Client } from '@aws-sdk/client-s3'

export const s3client = new S3Client({
    region: 'default',
    endpoint: process.env.s3_ENDPOINT!,
    credentials: {
        accessKeyId: process.env.s3_ACCESS_KEY!,
        secretAccessKey: process.env.s3_SECRET_KEY!,
    },
    forcePathStyle: true,
})
