import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.bgTrack.createMany({
    data: [
      {
        bgtrack_id: 'gentle',
        name: 'Gentle',
        tier: 'free',
        price_multiplier: 1.0,
        labels: ['Music', 'Meditative'],
        preview_path: 'previews/gentle.mp3',
      },
      {
        bgtrack_id: 'nature',
        name: 'Nature Sounds',
        tier: 'free',
        price_multiplier: 1.0,
        labels: ['Sounds'],
        preview_path: 'previews/gentle.mp3',
      },
      {
        bgtrack_id: 'rain',
        name: 'Moderate Rain Sounds',
        tier: 'starter',
        price_multiplier: 1.0,
        labels: ['Sounds'],
        preview_path: 'previews/gentle.mp3',
      },
      {
        bgtrack_id: '14beta',
        name: '14hz Beta Waves',
        tier: 'free',
        price_multiplier: 1.0,
        labels: ['Frequency'],
        preview_path: 'previews/gentle.mp3',
      },
      {
        bgtrack_id: '6hztheta',
        name: '6hz Theta Waves',
        tier: 'starter',
        price_multiplier: 1.0,
        labels: ['Frequency'],
        preview_path: 'previews/gentle.mp3',
      },
      {
        bgtrack_id: 'piano',
        name: 'Piano',
        tier: 'free',
        price_multiplier: 1.0,
        labels: ['Music', 'Classical'],
        preview_path: 'previews/oceanic.mp3',
      },
      {
        bgtrack_id: '528hz14hz',
        name: '528hz + 14hz Binaural',
        tier: 'pro',
        price_multiplier: 1.0,
        labels: ['Frequency', 'Binaural Beats'],
        preview_path: 'previews/gentle.mp3',
      },
      {
        bgtrack_id: 'boundless',
        name: 'Boundless Paradise',
        tier: 'starter',
        price_multiplier: 1.0,
        labels: ['Tranquil', 'Ambient'],
        preview_path: 'previews/gentle.mp3',
      },
      {
        bgtrack_id: 'deepthetawaves',
        name: 'Deep Theta Waves',
        tier: 'pro',
        price_multiplier: 1.0,
        labels: ['Frequency', 'Binaural Beats'],
        preview_path: 'previews/gentle.mp3',
      },
      
      {
        bgtrack_id: 'shrine',
        name: 'Idyllic Shrine',
        tier: 'free',
        price_multiplier: 1.0,
        labels: ['Music', 'Peaceful'],
        preview_path: 'previews/gentle.mp3',
      },
    ],
    skipDuplicates: true,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
