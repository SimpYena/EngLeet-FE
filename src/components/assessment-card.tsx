import { Pencil } from "lucide-react";
import Image from "next/image";

export default function AssessmentCard() {
  return (
    <div className=" bg-slate-50 p-4">
      <div className="max-w-md">
        <div className="flex items-center gap-2 mb-8">
          <Pencil className="w-6 h-6" />
          <h1 className="text-xl font-medium">Do the assessment test</h1>
        </div>

        <div className="bg-white rounded-3xl p-8 flex flex-col items-center shadow-sm">
          <Image
            src={
              "https://cdn-icons-png.freepik.com/256/1581/1581884.png?semt=ais_hybrid"
            }
            alt="Test image"
            width={100}
            height={105}
            className="p-4"
          />

          <button className="w-4/5 bg-gray-900 text-white rounded-xl py-4 font-medium hover:bg-gray-800 transition-colors">
            Do right now!
          </button>
        </div>
      </div>
    </div>
  );
}
