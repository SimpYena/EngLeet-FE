"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/app/application/ui/card";
import { Separator } from "@/app/application/ui/separator";
import api from "../../../../utils/apis/user.service";
import { Transcript } from "@/types/quiz.type";
import Question from "./question";
import Component from "./comment";
import useTotalPagesStore from "@/stores/quizTotal";
import { Button } from "@/app/application/ui/button";

const TranscriptUI = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [transcript, setTranscript] = useState<Transcript | null>(null);
  const [nextTranscript, setNextTranscript] = useState<Transcript | null>(null);
  const [previousTranscript, setPreviousTranscript] = useState<Transcript | null>(null);
  const [showComment, setShowComment] = useState<boolean | null>(false);
  const [shouldError, setShouldError] = useState(false);
  const totalPages = useTotalPagesStore((state) => state.totalPages);
  

  useEffect(() => {
    const fetchTranscript = async () => {
      try {
        const response = await api.getQuizDetail(id as string);
        if (response.error) {
          throw new Error(response.error);
        }
        setTranscript(response);
      } catch (error) {
        console.error(error);
        setShouldError(true);
      }
    };

    fetchTranscript();
  }, [id]);
  
  return (
    <div className="w-full mx-auto p-4 space-y-4 m-12 bg-white rounded-lg shadow-lg">
      <div className="w-full flex flex-col justify-center gap-5">
        <div className="m-5">
          {shouldError ? (
            <Card>
              <CardHeader>
                <CardTitle>Failed to fetch data</CardTitle>
              </CardHeader>
              <CardContent>
                <p>There was an error fetching the data. Please try again.</p>
                <Button variant="destructive">
                  <a href="/application/quiz">Go back</a>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              {transcript?.audio_link ? (
                <Card className="mb-4">
                  <CardHeader>
                    <CardTitle>Listening Quizz</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <audio controls>
                      <source src={transcript.audio_link} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </CardContent>
                </Card>
              ) : null}
              <Question
                args={transcript}
                total={totalPages}
                showComment={setShowComment}
                page={id}
              />
            </>
          )}
        </div>
        <Separator orientation="vertical" />
        <div className="m-5">
          {showComment && (
            <div className="animate-fade-in">
              <Component />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TranscriptUI;
