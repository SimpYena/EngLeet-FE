"use client";
import { ChangeEvent, useState } from "react";
import "./style.css";
import RecentTests from "@/components/recentTest";
import AssessmentCard from "@/components/assessment-card";

export default function Main() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <main className="flex-1 p-6">
        <h2 className="text-4xl font-bold mb-6">Dashboard</h2>
        <div className="grid grid-cols-12 gap-6">
          {/* Recent Tests Section */}
          <div className="col-span-12 lg:col-span-6">
            <RecentTests />
          </div>

          {/* Ranking Section */}
          <div className="col-span-12 lg:col-span-6">
            <h3 className="text-lg font-semibold mb-4">Ranking</h3>
            <div className="space-y-4">
              <div className="bg-gray-100 p-4 rounded-lg flex items-center">
                <img
                  src="https://via.placeholder.com/50"
                  alt="User"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-medium">Nguyen Anh</h4>
                  <p className="text-sm text-gray-600">Score: 1120</p>
                </div>
              </div>
              <div className="bg-gray-200 p-4 rounded-lg flex items-center">
                <img
                  src="https://via.placeholder.com/50"
                  alt="User"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-medium">Duong Hau</h4>
                  <p className="text-sm text-gray-600">Score: 1140</p>
                </div>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg flex items-center">
                <img
                  src="https://via.placeholder.com/50"
                  alt="User"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-medium">Tran Vi Huy</h4>
                  <p className="text-sm text-gray-600">Score: 1100</p>
                </div>
              </div>
            </div>
          </div>

          {/* Assessment Section */}
          <div className="col-span-12 lg:col-span-6">
            <AssessmentCard />
          </div>

          <div className="col-span-12 lg:col-span-6">
            <h3 className="text-lg font-semibold mb-4">Streaks</h3>
            <div className="bg-white shadow-lg p-6 rounded-lg">
              <p className="font-bold mb-4">
                You are on{" "}
                <span className="bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
                  7 days streak
                </span>
                , keep it up!
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
