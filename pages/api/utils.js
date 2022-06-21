import prisma from "lib/prisma";
import { faker } from '@faker-js/faker';
import AWS from 'aws-sdk';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.end();

  if (req.body.task === 'generate_content') {
    let count = 0;

    while(count < 10) {
      await prisma.user.create({
        data: {
          name: faker.name.findName(),
          username: faker.internet.userName().toLocaleLowerCase(),
          email: faker.internet.email().toLocaleLowerCase(),
          image: faker.image.avatar()
        }
      });

      count++;
    }

    const s3 = new AWS.S3({
      accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY
    });

    const thumbnailUrl = 'https://placeimg.com/800/450/any';
    const videoUrl = 'https://bootcamp-fnebex.s3.amazonaws.com/SampleVideo_360x240_10mb.mp4';
    const users = await prisma.user.findMany();

    const getRandomUser = () => {
      const random = Math.floor(Math.random() * users.length);
      return users[random];
    }

    let videoCount = 0;
    while (videoCount < 20) {
      await prisma.video.create({
        data: {
          title: faker.lorem.words(),
          thumbnail: thumbnailUrl,
          url: videoUrl,
          length: faker.datatype.number(1000),
          visibility: 'public',
          views: faker.datatype.number(1000),
          author: {
            connect: {
              id: getRandomUser().id
            }
          }
        }
      });
    }

  }

  if (req.body.task === 'clean_database') {
    await prisma.user.deleteMany({});
  }

  res.end();
};
