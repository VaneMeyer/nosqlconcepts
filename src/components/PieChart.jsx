import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import { neo4jTasks } from "../data/tasksData";

const PieChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  let numCorrect = 0;
  let numIncorrect = 0;
  let numNotSpec = 0;
  let numNotKnow = 0;
  let taskarray = neo4jTasks;
  let title = "Neo4J";
  for (let i = 1; i <= taskarray.length; i++) {
    const answer5 =
      localStorage.getItem(`${title.toLowerCase()}isCorrect${i}`) || "0";

    if (answer5 === "0") {
      numNotSpec += 1;
    }
    if (answer5 === "I don't know") {
      numNotKnow += 1;
    }
    if (answer5 === "Yes") {
      numCorrect += 1;
    }
    if (answer5 === "No") {
      numIncorrect += 1;
    }
  }

  const data = [
    { id: "correct", value: numCorrect },
    { id: "incorrect", value: numIncorrect },
    { id: "not sure", value: numNotKnow },
    { id: "not specified", value: numNotSpec },
  ];

  return (
    <ResponsivePie
      data={data}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
      }}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={colors.grey[100]}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      enableArcLabels={false}
      arcLabelsRadiusOffset={0.4}
      arcLabelsSkipAngle={7}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
};

export default PieChart;
