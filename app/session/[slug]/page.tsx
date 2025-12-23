import { redirect } from 'next/navigation';
import AudioPlayer from '@/components/AudioPlayer';
import { createClient } from '@/utils/supabase/server';
import { prisma } from '@/lib/prisma';
import { SessionDetailsWrapper } from '@/components/SessionDetailsWrapper';
import FooterNavigation from '@/components/FooterNavigation';

export default async function SessionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Fetch meditation details
  const meditation = await prisma.meditation.findUnique({
    where: { id: slug },
  });

  if (!meditation || meditation.user_id !== user.id) {
    redirect('/home');
  }

  if (!meditation.storage_path) {
    throw new Error('No audio file available.');
  }

  // Fetch voices for mapping voice_id to name
  const voices = await prisma.voice.findMany();
  const voiceMap = new Map(voices.map(voice => [voice.voice_id, voice.name]));
  const voiceName = voiceMap.get(meditation.voice_id || '') || "Charlotte";

  // Fetch bg tracks for mapping track_id to name
  const bgtracks = await prisma.bgTrack.findMany();
  const bgtrackMap = new Map(bgtracks.map(track => [track.bgtrack_id, track.name]));
  const trackName = bgtrackMap.get(meditation.background_track || '') || "Lo-Fi Atmospheric";


  // Generate a signed URL to play the audio
  const fullPath = `${user.id}/${meditation.storage_path}`;

  const { data: signedUrlData, error } = await supabase.storage
    .from('meditation-output')
    .createSignedUrl(fullPath, 3600);

  if (error || !signedUrlData) {
    console.error('Signed URL error:', error);
    throw new Error('Failed to generate signed URL.');
  }

  return (
    <>
      <div className="fixed inset-0 bg-black text-white flex justify-center items-center overflow-hidden">
        <div className="max-w-md w-full space-y-4 flex flex-col items-center px-4">
          <AudioPlayer
            title={meditation.title || 'Deep Rest Session'}
            audioUrl={signedUrlData.signedUrl}
            language={meditation.language_code.toUpperCase()}
          />
          <SessionDetailsWrapper
            title={meditation.title || "Deep Rest Session"}
            description={meditation.description || "A guided session for deep rest."}
            duration={`${Math.ceil(meditation.duration_seconds / 60)}m`}
            language={meditation.language_code.toUpperCase()}
            level={meditation.is_beginner ? "Beginner" : "Regular"}
            technique={meditation.technique || "Balance of Opposites"}
            voice={voiceName}
            track={trackName}
            generatedDate={meditation.created_at.toLocaleDateString('en-US', {
              month: '2-digit',
              day: '2-digit',
              year: 'numeric'
            })}
          />
        </div>
      </div>
      <FooterNavigation />
    </>
  );
}
