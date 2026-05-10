import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Flame, Trophy } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const username = "YuvarajX";

const TOTALS = {
  Easy: 873,
  Medium: 1832,
  Hard: 798,
};

export function Coding() {
  const [stats, setStats] = useState([
    { label: "Easy", value: 0, total: TOTALS.Easy },
    { label: "Medium", value: 0, total: TOTALS.Medium },
    { label: "Hard", value: 0, total: TOTALS.Hard },
  ]);

  const [totalSolved, setTotalSolved] = useState(0);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    async function fetchLeetCodeData() {
      try {
        const query = `
        query userProfile($username: String!) {
          matchedUser(username: $username) {
            submitStats {
              acSubmissionNum {
                difficulty
                count
              }
            }

            userCalendar {
              streak
            }
          }
        }
        `;

        const response = await fetch(
          "https://corsproxy.io/?https://leetcode.com/graphql",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              query,
              variables: {
                username,
              },
            }),
          }
        );

        const result = await response.json();

        if (!result.data || !result.data.matchedUser) {
          return;
        }

        const data =
          result.data.matchedUser.submitStats.acSubmissionNum;

        const total = data[0].count;
        const easy = data[1].count;
        const medium = data[2].count;
        const hard = data[3].count;

        setTotalSolved(total);

        setStats([
          {
            label: "Easy",
            value: easy,
            total: TOTALS.Easy,
          },
          {
            label: "Medium",
            value: medium,
            total: TOTALS.Medium,
          },
          {
            label: "Hard",
            value: hard,
            total: TOTALS.Hard,
          },
        ]);

        setStreak(
          result.data.matchedUser.userCalendar.streak
        );
      } catch (error) {
        console.log(error);
      }
    }

    fetchLeetCodeData();
  }, []);

  return (
    <section id="coding" className="relative py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="DSA / Coding"
          title={
            <>
              Sharpening{" "}
              <span className="text-gradient-primary">
                problem-solving
              </span>{" "}
              daily.
            </>
          }
          description="Consistent practice across data structures, algorithms and competitive programming."
        />

        <div className="grid gap-4 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="ring-glow flex items-center justify-between rounded-2xl border border-border bg-surface/60 p-5 backdrop-blur md:col-span-2"
          >
            <div>
              <div className="text-[11px] uppercase tracking-widest text-muted-foreground">
                Solved
              </div>

              <div className="font-display text-3xl font-bold text-foreground">
                {totalSolved} / 3500+
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-mono">
              <Flame className="h-3.5 w-3.5" />
              {streak} day streak
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="ring-glow flex items-center gap-3 rounded-2xl border border-border bg-surface/60 p-5 backdrop-blur"
          >
            <Trophy className="h-5 w-5" />

            <div className="text-sm">
              <span className="font-semibold">Top 12%</span>{" "}
              <span className="text-muted-foreground">
                on weekly contests
              </span>
            </div>
          </motion.div>

          {stats.map((s, i) => {
            const pct = Math.round(
              (s.value / s.total) * 100
            );

            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.5,
                  delay: 0.1 + i * 0.05,
                }}
                className="rounded-2xl border border-border bg-surface/60 p-5 backdrop-blur"
              >
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium">
                    {s.label}
                  </span>

                  <span className="font-mono text-muted-foreground">
                    <span className="text-foreground">
                      {s.value}
                    </span>{" "}
                    / {s.total}
                  </span>
                </div>

                <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${pct}%` }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1,
                      ease: "easeOut",
                    }}
                    className="h-full rounded-full bg-foreground"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}