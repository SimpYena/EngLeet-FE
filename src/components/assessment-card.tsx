import { Pencil } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AssessmentCard() {
  const router = useRouter();
  const goToTest = () => {
    router.push("/application/assessment");
  }

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm">
      <div className="max-w-md">
        <div className="flex items-center font-bold text-lg gap-2 mb-8">
          <Pencil />
          <h3 className="text-lg">Do the assessment test</h3>
        </div>

        <div className="flex justify-center flex-col gap-4">
          <Image
            src={
              "https://cdn-icons-png.freepik.com/256/1581/1581884.png?semt=ais_hybrid"
            }
            alt="Test image"
            width={100}
            height={105}
            className="p-4"
          />

          <button onClick={goToTest} className="w-4/5 bg-gray-900 text-white rounded-xl py-4 font-medium hover:bg-gray-800 transition-colors">
            Do right now!
          </button>
        </div>
      </div>
    </div>
  );
}
