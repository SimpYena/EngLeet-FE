"use client";

import { Button } from "@/app/application/ui/button";
import { RadioGroup, RadioGroupItem } from "@/app/application/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Timer } from "lucide-react";
import Image from "next/image";
import logo from "../../../../public/images/logo.png";
export default function QuizInterface() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="mx-auto space-y-6 p-6 h-4/5">
        <div className="min-h-screen bg-[#F8F9FE]">
          {/* Header */}
          <header className="p-4 flex justify-between items-center max-w-7xl mx-auto">
            <div className="flex items-center gap-4">
              <div className="bg-white p-2 rounded-lg shadow-sm">
                <Image
                  src={logo}
                  alt="TCS iON Logo"
                  width={120}
                  height={40}
                  className="h-8 w-auto"
                />
              </div>
              <div>
                <h1 className="font-medium">TCQ Quiz Competion</h1>
                <p className="text-sm text-muted-foreground">
                  TCS Campus Drive-2023
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Timer className="w-5 h-5" />
                <span className="font-mono font-medium">00:57:40</span>
              </div>
              <Button className="bg-red-600 hover:bg-red-700">
                Kết thúc ngay
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <main className="max-w-7xl mx-auto p-4">
            <Tabs defaultValue="reading" className="space-y-6">
              <TabsList className="bg-transparent border-b rounded-none h-auto p-0 space-x-8">
                <TabsTrigger
                  value="reading"
                  className="border-b-2 border-transparent data-[state=active]:border-primary rounded-none bg-transparent px-0 pb-2"
                >
                  Reading
                </TabsTrigger>
                <TabsTrigger
                  value="listening"
                  className="border-b-2 border-transparent data-[state=active]:border-primary rounded-none bg-transparent px-0 pb-2"
                >
                  Listening
                </TabsTrigger>
              </TabsList>

              <TabsContent value="reading" className="space-y-8">
                {/* Reading Passage */}
                <div className="space-y-4">
                  <h2 className="font-medium">Câu 1</h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      Lorem ipsum dolor amet, consectetuer adipiscing elit. Nisi
                      torquent adipiscing quam semper rutrum enim libero
                      fringilla tempus. Sollicitudin mus hac molestie dis mattis
                      luctus habitasse nam. Imperdiet condimentum bibendum
                      conubia ornare augue luctus! Faucibus conubia tempor sem
                      fermentum penatibus vehicula lacinia in bibendum. Placerat
                      pulvinar potenti morbi consequat sapien. Lectus a erat
                      sociosqu feugiat, urna nibh.
                    </p>
                    <p>
                      Etiam purus conubia egestas a adipiscing faucibus per ante
                      magna. Suscipit leo dictumst conubia porttitor molestie
                      ridiculus. Nisi ligula feugiat volutpat orci feugiat
                      ultricies? Sollicitudin dis duis ex felis eros platea
                      velit sagittis. Orci sapien morbi mi, tortor mollis purus
                      volutpate. Purus vivamus prim himenaeos tristique id dolor
                      ex. Suspendisse maecenas at nisl tempus suspendisse sem.
                      Mi proin platea himenaeos molestie penatibus mi hendrerit.
                    </p>
                    <p>
                      Faucibus varius convallis ipsum dictum netus nulla. Diam
                      placerat metus placerat maximus felis nibh. Ornare integer
                      ipsum inceptos etiam penatibus. Vestibulum lacus quisque
                      eget ultrices porttitor dis cras platea morbi. Facilisi
                      sapien aliquam sapien posuere etiam morbi enim. Mollis
                      litora elit blandit primis lectus integer interdum
                      egestas. Imperdiet euismod in ad amet ligula nascetur
                      dignissim ex. Viverra gravida et eu suspendisse; curabitur
                      torquent cursus nisl. Cubilia magna venenatis ornare
                      euismod sociosqu cursus nostra in metus. Magna montes ex
                      sodales cursus pellentesque.
                    </p>
                  </div>
                </div>

                {/* Question */}
                <div className="space-y-4">
                  <h2 className="font-medium">Câu 1.1</h2>
                  <p className="text-muted-foreground">
                    There is a party where n friends numbered from 0 to n - 1
                    are attending. There is an infinite number of chairs in this
                    party that are numbered from 0 to infinity. When a friend
                    arrives at the party, they sit on the unoccupied chair with
                    the smallest number.
                  </p>
                  <RadioGroup defaultValue="A" className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="A" id="A" />
                      <label
                        htmlFor="A"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        AAAAAAAAA
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="B" id="B" />
                      <label
                        htmlFor="B"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        BBBBBBBBBBBB
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="C" id="C" />
                      <label
                        htmlFor="C"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        CCCCCCCCCCCC
                      </label>
                    </div>
                  </RadioGroup>
                </div>
              </TabsContent>

              <TabsContent value="listening">
                <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                  Listening content will go here
                </div>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </div>
  );
}
