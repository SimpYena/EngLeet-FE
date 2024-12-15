import { ChevronLeft, ChevronRight, NotepadText, Users } from "lucide-react";
import Image from "next/image";

export default function RecentTests() {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center font-bold text-lg gap-2">
          <NotepadText />
          <h3 className="">Do the assessment test</h3>
        </div>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 snap-x justify-between">
        <div className="min-w-[300px] h-[400px] rounded-3xl overflow-hidden snap-start relative border-2">
          <Image
            src="https://img.lazcdn.com/g/p/2dd58b3fbc321ab97c83fd4916fcf414.jpg_720x720q80.jpg"
            alt="TNT TOEIC Book Cover"
            width={280}
            height={300}
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute bottom-0 left-0 right-0 bg-black/30 backdrop-blur p-4">
            <div className="flex">
              {/* <div>
                <div className="w-12 h-12 rounded-full flex items-center justify-center">
                  <CircularProgress progress={75} />
                </div>
              </div> */}
              <div className=" p-2">
                <h3 className="text-lg font-bold text-white">
                  lorem ipsum polo silt
                </h3>
                <div className="flex gap-2 items-center">
                  <Users className="w-4 h-4" color="white" />
                  <span className="text-white">10 participants</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="min-w-[300px] h-[400px] rounded-3xl overflow-hidden snap-start relative border-2">
          <Image
            src="https://img.lazcdn.com/g/p/2dd58b3fbc321ab97c83fd4916fcf414.jpg_720x720q80.jpg"
            alt="TNT TOEIC Book Cover"
            width={280}
            height={300}
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute bottom-0 left-0 right-0 bg-white/20 backdrop-blur p-4">
            <div className="flex items-center justify-center">
              <div>
                <div className="w-12 h-12 rounded-full flex items-center justify-center">
                  <CircularProgress progress={75} />
                </div>
              </div>
              <div className="flex items-center p-2">
                <h3 className="text-lg font-medium text-white">lorem ipsum polo silt</h3>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
