import { createPresignedPost } from '@aws-sdk/s3-presigned-post'
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';

import { v4 as uuidv4 } from 'uuid'

export async function POST(request: Request) {
  const { filename, contentType,userId } = await request.json()
  if(process.env.AWS_BUCKET_NAME){
  try {
    const client = new S3Client({ region: process.env.AWS_REGION })
  
    const { url, fields } = await createPresignedPost(client, {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `profileImage/${userId}`,
      Conditions: [
        ['content-length-range', 0, 10485760], // up to 10 MB
        ['starts-with', '$Content-Type', contentType],
      ],
      Fields: {
        acl: 'public-read',
        'Content-Type': contentType,
      },
      Expires: 600, // Seconds before the presigned post expires. 3600 by default.
    })


    return Response.json({ url, fields })

} catch (error:any) {
    return Response.json({ error: error.message })
  }
  
  }
}


// export async function GET(request: Request) {
//   const { userId, filename } = await request.json();

//   if (!process.env.AWS_BUCKET_NAME) {
//     return new Response(JSON.stringify({ error: 'S3 bucket name is not configured' }), { status: 500 });
//   }

//   try {
//     const client = new S3Client({ region: process.env.AWS_REGION });
//     const command = new GetObjectCommand({
//       Bucket: process.env.AWS_BUCKET_NAME,
//       Key: `profileImage/${userId}/${filename}`,
//     });

//     // Set the expiration time for the presigned URL, e.g., 60 seconds
//     const url = await getSignedUrl(client, command, { expiresIn: 60 });

//     return new Response(JSON.stringify({ url }), { status: 200 });
//   } catch (error) {
//     console.error('Error generating presigned URL:', error);
//     return new Response(JSON.stringify({ error: error.message }), { status: 500 });
//   }
// }