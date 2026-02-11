import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Videoplayer from "@/components/Videopplayer";

const WatchPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [videos, setVideos] = useState<any[]>([]);
  const [currentVideo, setCurrentVideo] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    fetch("/api/video/getall")
      .then((res) => res.json())
      .then((data) => {
        setVideos(data);
        setCurrentVideo(data.find((v: any) => v._id === id));
      });
  }, [id]);

  if (!currentVideo) return <p className="p-6">Loading...</p>;

  return (
    <div className="flex gap-6 p-6">
      {/* LEFT SIDE */}
      <div className="w-[70%]">
        <Videoplayer video={currentVideo} />

        <h1 className="text-xl font-semibold mt-4">
          {currentVideo.videotitle}
        </h1>

        <p className="text-sm text-gray-600">
          {currentVideo.views.toLocaleString()} views •{" "}
          {currentVideo.channel}
        </p>

        {/* COMMENTS */}
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Comments</h3>
          <textarea
            className="w-full border rounded p-2"
            placeholder="Add a comment..."
          />
        </div>
      </div>

      {/* RIGHT SIDE – UP NEXT */}
      <div className="w-[30%] space-y-4">
        <h3 className="font-semibold">Up next</h3>

        {videos
          .filter((v) => v._id !== currentVideo._id)
          .map((video) => (
            <div
              key={video._id}
              className="flex gap-3 cursor-pointer"
              onClick={() =>
                router.push(`/watch/${video._id}`)
              }
            >
              <img
                src={video.thumbnail}
                className="w-40 aspect-video rounded-lg object-cover bg-black"
              />

              <div>
                <p className="text-sm font-semibold line-clamp-2">
                  {video.videotitle}
                </p>
                <p className="text-xs text-gray-600">
                  {video.channel}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default WatchPage;

