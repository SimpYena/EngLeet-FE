import { Button } from "@/app/application/ui/button";
import Image from "next/image";
import image from "../../../../../public/images/illustration.png";
import logo from "../../../../../public/images//logo.png";
export default function QuizCompletion() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="mx-auto space-y-6 p-6">
        <div className="min-h-screen bg-white">
          {/* Header */}
          <header className="p-4 flex justify-between items-center max-w-7xl mx-auto">
            <div className="flex items-center gap-2">
              <Image
                src={logo}
                alt="TCS iON Logo"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
              <div className="text-sm">
                <div className="font-medium">TCS Quiz Competition</div>
                <div className="text-muted-foreground text-xs">
                  TCS Campus Drive-2023
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="w-5 h-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-full h-full"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <span className="font-mono">00:00:00</span>
            </div>
          </header>

          <main className="max-w-4xl mx-auto px-4 py-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Cảm Ơn Vì Đã Tham Gia
            </h1>
            <h2 className="text-xl md:text-2xl mb-12">
              Hệ Thống Đang Chấm Điểm!
            </h2>

            <div className="relative w-full max-w-md mx-auto mb-8">
              <Image
                src={image}
                alt="Quiz completion illustration"
                width={300}
                height={300}
                className="w-full h-auto"
              />
            </div>

            <p className="text-muted-foreground mb-8">
              Bấm vào nút &quot;Xem điểm&quot; để có thể xem lại kết quả!
            </p>

            <Button className="bg-[#5D4E7B] hover:bg-[#4A3D62] text-white px-8 py-2 rounded-full">
              Xem điểm
            </Button>
          </main>
        </div>
      </div>
    </div>
  );
}
