import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";

export const drawerList = [
  {
    key: "1",
    icon: (
      <DashboardRoundedIcon
        sx={{
          width: 20,
          height: 20,
        }}
      />
    ),
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    key: "2",
    icon: (
      <GroupRoundedIcon
        sx={{
          width: 20,
          height: 20,
        }}
      />
    ),
    label: "User Management",
    path: "/dashboard/user-management",
  },
];
