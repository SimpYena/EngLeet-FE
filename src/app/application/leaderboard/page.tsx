"use client";
import { Ranker } from "@/types/leaderboard.type";
import userService from "@/utils/services/user.service";
import {
  Avatar,
  getKeyValue,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from "@nextui-org/react";
import { isEmpty } from "lodash";
import { RotateCcw, Sparkle, SquareSigma } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function TopRankerCard({ ranker, index }: { ranker: Ranker; index: number }) {
  return (
    <div
      key={index}
      className="flex flex-col flex-1 p-4 bg-white rounded-3xl p-4 shadow-md min-w-[270px]"
    >
      <div className="flex items-center gap-4 justify-between">
        <div className="flex gap-4 items-center">
          <Avatar src={ranker.image_link} alt={ranker.full_name} size="lg" />
          <div>
            <p className="font-bold line-clamp-2">{ranker.full_name}</p>
            <span className="flex items-center gap-2 font-normal text-[#7a7a7a]">
              <Sparkle size={16}></Sparkle>
              {ranker.totalScore}
            </span>
          </div>
        </div>
        <div>
          <div
            className={`w-[40px] h-[40px] rounded-full flex items-center justify-center ${
              ranker.position === 1 ? "bg-[#EFBF04]" : ""
            } ${ranker.position === 2 ? "bg-[#c0c0c0]" : ""} ${
              ranker.position === 3 ? "bg-[#CE8946]" : ""
            }`}
          >
            <span className="text-white font-bold">{ranker.position}</span>
          </div>
        </div>
      </div>
      <div className="flex gap-4 mt-6">
        <div className="">
          <div className="flex items-center gap-2 text-[#7a7a7a]">
            <RotateCcw size={16}></RotateCcw>
            <span className="">Max retry</span>
          </div>
          <span className="font-bold">{ranker.maxAttempt}</span>
        </div>
        <div className="">
          <div className="flex items-center gap-2 text-[#7a7a7a]">
            <SquareSigma size={16}></SquareSigma>
            <span className="">Quizz attemp</span>
          </div>
          <span className="font-bold">{ranker.totalQuizzes}</span>
        </div>
      </div>
    </div>
  );
}

export default function Leaderboard() {
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const rowsPerPage = 20;
  const [topRankers, setTopRankers] = useState<Ranker[]>([]);
  const [rankers, setRankers] = useState<Ranker[]>([]);
  useEffect(() => {
    const fetchTopRankers = async () => {
      userService.getRankers(3, 0).then((data) => {
        setTopRankers(data);
      });
    };
    const fetchData = async () => {
      const query = Object.fromEntries(searchParams.entries());
      const { limit = 20, offset = 3 } = query;
      userService.getRankers(limit, offset).then((data) => {
        setRankers(data);
      });
    };

    fetchTopRankers();
    fetchData();
  }, []);
  return (
    <div className=" mx-auto space-y-6 p-6">
      <h1 className="text-4xl font-bold">Leaderboard</h1>
      <div className="w-full h-[200px] flex">
        {!isEmpty(topRankers) ? (
          <div className="w-full gap-6 flex flex-row flex-wrap">
            {topRankers.map((ranker, index) => (
              <TopRankerCard key={index} ranker={ranker} index={index} />
            ))}
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Spinner color="primary" label="Loading..." />
          </div>
        )}
      </div>
      <div className="w-full h-[400px] flex">
        <Table
          aria-label="Example table with client side pagination"
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="secondary"
                page={page}
                total={totalPages}
                onChange={(page) => setPage(page)}
              />
            </div>
          }
          classNames={{
            wrapper: "min-h-[222px]"
          }}
        >
          <TableHeader>
            <TableColumn key="position">RANK</TableColumn>
            <TableColumn key="full_name">NAME</TableColumn>
            <TableColumn key="totalScore">POINT</TableColumn>
            <TableColumn key="totalQuizzes">QUIZZ ATTEMP</TableColumn>
            <TableColumn key="maxAttempt">MAX RETRY</TableColumn>
          </TableHeader>
          <TableBody
            items={rankers}
            isLoading={isEmpty(rankers)}
            loadingContent={<Spinner color="primary" label="Loading..." />}
          >
            {(item) => (
              <TableRow key={item.user_id}>
                {(columnKey) => (
                  <TableCell>
                    {columnKey.toString() === "full_name" ? (
                      <div className="flex items-center gap-2">
                        <Avatar
                          src={item.image_link}
                          alt={item.full_name}
                          size="sm"
                        />
                        <span>{getKeyValue(item, columnKey)}</span>
                      </div>
                    ) : (
                      getKeyValue(item, columnKey)
                    )}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
