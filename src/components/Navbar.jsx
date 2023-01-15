import React, { useState } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
  CloseOutlined,
} from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import { useDispatch } from "react-redux";
import { setMode } from "state";
import profileImage from "assets/profile-photo.jpg";
import {
  AppBar,
  Button,
  Box,
  Typography,
  IconButton,
  InputBase,
  Toolbar,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";

const Navbar = ({ user, isNonMobile, isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
        maxWidth: '100%'
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", width: '100%' }}>
        {isSearchExpanded && !isNonMobile ? (
            <FlexBetween
                backgroundColor={theme.palette.background.alt}
                borderRadius="9px"
                width="inherit"
                p="0.1rem 0px 0px 1.5rem"
            >
                <InputBase placeholder="Search..." sx={{
                    width: "inherit",
                }} />
                <FlexBetween>
                    <IconButton>
                        <Search sx={{ fontSize: "20px" }} />
                    </IconButton>
                    <IconButton>
                        <CloseOutlined onClick={() => setIsSearchExpanded(!isSearchExpanded)} sx={{ fontSize: "20px" }} />
                    </IconButton>
                </FlexBetween>
            </FlexBetween>
        ) : (
            <>
                {/* LEFT SIDE */}
                <FlexBetween>
                <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <MenuIcon />
                </IconButton>
                {isNonMobile ? (
                    <FlexBetween
                        backgroundColor={theme.palette.background.alt}
                        borderRadius="9px"
                        width="inherit"
                        p="0.1rem 0px 0px 1.5rem"
                    >
                        <InputBase placeholder="Search..." sx={{
                            width: "inherit",
                        }} />
                        <IconButton>
                            <Search sx={{ fontSize: "20px" }} />
                        </IconButton>
                    </FlexBetween>
                ) : null}
                </FlexBetween>

                {/* RIGHT SIDE */}
                <FlexBetween gap={isNonMobile ? '1.5rem' : '.5rem'}>
                <IconButton onClick={() => dispatch(setMode())}>
                    {theme.palette.mode === "dark" ? (
                    <DarkModeOutlined sx={{ fontSize: "25px" }} />
                    ) : (
                    <LightModeOutlined sx={{ fontSize: "25px" }} />
                    )}
                </IconButton>
                {isNonMobile ? (
                    <IconButton>
                        <SettingsOutlined sx={{ fontSize: "25px" }} />
                    </IconButton>
                ) : null}

                {isNonMobile ? (
                    <FlexBetween>
                        <Button
                        onClick={handleClick}
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            textTransform: "none",
                            gap: "1rem",
                        }}
                        >
                        <Box
                            component="img"
                            alt="profile"
                            src={profileImage}
                            height="32px"
                            width="32px"
                            borderRadius="50%"
                            sx={{ objectFit: "cover" }}
                        />
                        <Box textAlign="left">
                            <Typography
                            fontWeight="bold"
                            fontSize="0.85rem"
                            sx={{ color: theme.palette.secondary[100] }}
                            >
                            {user.name}
                            </Typography>
                            <Typography
                            fontSize="0.75rem"
                            sx={{ color: theme.palette.secondary[200] }}
                            >
                            {user.occupation}
                            </Typography>
                        </Box>
                        <ArrowDropDownOutlined
                            sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
                        />
                        </Button>
                        <Menu
                        anchorEl={anchorEl}
                        open={isOpen}
                        onClose={handleClose}
                        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                        >
                        <MenuItem onClick={handleClose}>Log Out</MenuItem>
                        </Menu>
                    </FlexBetween>
                ) : (
                    <FlexBetween>
                        <IconButton>
                            <Search onClick={() => setIsSearchExpanded(!isSearchExpanded)} sx={{ fontSize: "25px" }} />
                        </IconButton>
                    </FlexBetween>
                )}
                </FlexBetween>
            </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;