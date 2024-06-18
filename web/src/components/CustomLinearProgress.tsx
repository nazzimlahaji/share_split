import { LinearProgress, styled } from "@mui/material";

const CustomLinearProgress = styled(LinearProgress)(() => ({
  height: 5, // Adjust the height for better visibility
  borderRadius: 5, // Smooth the corners for a modern look
  backgroundColor: "rgba(22, 119, 255, 0.2)", // Lighter shade for the background
  "& .MuiLinearProgress-bar": {
    backgroundColor: "rgb(22, 119, 255)", // Solid color for the bar
  },
}));

export default CustomLinearProgress;
