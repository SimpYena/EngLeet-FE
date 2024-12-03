import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import CircularProgress from "./progressCircular";

export default function RecentTests() {
  return (
    <div className="w-[90%] max-w-4xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold mb-4">Recently test</h2>
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

          <div className="absolute bottom-0 left-0 right-0 bg-white/30 backdrop-blur p-4">
            <div className="flex items-center justify-center">
              <div>
                <div className="w-12 h-12 rounded-full flex items-center justify-center">
                  <CircularProgress progress={75} />
                </div>
              </div>
              <div className="flex items-center p-2">
                <h3 className="text-lg font-medium">lorem ipsum polo silt</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="min-w-[300px] h-[400px] rounded-3xl overflow-hidden snap-start relative border-2">
          <Image
            src="https://img.lazcdn.com/g/p/2dd58b3fbc321ab97c83fd4916fcf414.jpg_720x720q80.jpg"
            alt="Background"
            width={280}
            height={400}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 backdrop-blur-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                <CircularProgress progress={75} />
              </div>
              <h3 className="text-lg font-medium text-white">
                lorem ipsum polo silt
              </h3>
            </div>
            <p className="text-lg text-white/80 mb-auto">
              The standard chunk of Lorem used since the 1500s is reproduced
              below for those interested.
            </p>
            <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-center">
              <button className="w-4/5 bg-[#2F2F2F] text-white px-6 py-2.5 rounded-lg hover:bg-gray-800 transition-colors">
                Do now!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
