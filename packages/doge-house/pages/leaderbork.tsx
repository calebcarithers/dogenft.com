import { css } from "@/../dsl/helpers/css";
import AppLayout from "@/components/Layouts/AppLayout";
import { Leaderboard, TotalRaised } from ".";

const LeaderboardPage = () => {
  return (
    <AppLayout>
      <div className={css("my-6")}>
        <TotalRaised />
        <div className={css("text-3xl", "text-center")}>
          for Save The Children
        </div>
      </div>
      <Leaderboard />
    </AppLayout>
  );
};

export default LeaderboardPage;
