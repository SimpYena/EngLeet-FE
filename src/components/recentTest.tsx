import { Button, Card, CardFooter, CardHeader, Image } from "@nextui-org/react";
import { ChevronLeft, ChevronRight, NotepadText, Users } from "lucide-react";
// import Image from "next/image";

export default function RecentTests() {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center font-bold text-lg gap-2">
          <NotepadText />
          <h3 className="">Recent Test</h3>
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
      <Card isFooterBlurred className="w-[250px] h-[300px] col-span-12 sm:col-span-7">
        <Image
          removeWrapper
          alt="Relaxing app background"
          className="z-0 w-full h-full object-cover"
          src="https://img.lazcdn.com/g/p/2dd58b3fbc321ab97c83fd4916fcf414.jpg_720x720q80.jpg"
        />
        <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
          <div className="flex flex-grow gap-2 items-center">
            <div className="flex flex-col">
              <p className="text-tiny text-white/60">Breathing App</p>
              <p className="text-tiny text-white/60">Get a good night&#39;s sleep.</p>
            </div>
          </div>
          <Button radius="full" size="sm">
            Get App
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
