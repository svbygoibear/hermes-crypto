import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

import { UserMenu, UserMenuSetting } from "./components/UserMenu/UserMenu";
import { PageMenu, PageMenuItem } from "./components/PageMenu/PageMenu";
import { AppLogoIcon } from "../../assets/AppLogoIcon";
import { APP_NAME } from "../../constants";

import AvatarImage from "../../assets/default-user-avatar.jpg";

export interface AppHeaderProps {
    isLoggedIn: boolean;
    userName?: string;
    onLogout?: () => void;
}

export const AppHeader: React.FunctionComponent<AppHeaderProps> = (props: AppHeaderProps) => {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseNavMenuButtonClick = (item: PageMenuItem) => {
        handleCloseNavMenu();
        // The scroll will happen after navigation
        if (window.location.pathname !== "/") {
            return;
        }

        // If on the home page, scroll immediately
        setTimeout(() => {
            const element = document.getElementById(item.targetId);
            if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }, 100);
        item.onClick();
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const settings: UserMenuSetting[] = [
        { id: "user-logout", displayName: "Logout", icon: null, onClick: () => props.onLogout }
    ];

    const pages: PageMenuItem[] = [
        { id: "page-mygame", displayName: "My Game", onClick: () => {}, targetId: "my-game" },
        { id: "page-about", displayName: "About", onClick: () => {}, targetId: "about" },
        { id: "page-contact", displayName: "Contact", onClick: () => {}, targetId: "contact" }
    ];

    return (
        <AppBar position="static" sx={{ backgroundColor: "#f2b5c0" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AppLogoIcon />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none"
                        }}>
                        {APP_NAME}
                    </Typography>
                    |&nbsp;&nbsp;
                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit">
                            <MenuIcon />
                        </IconButton>
                        <PageMenu items={pages} anchor={anchorElNav} onClose={handleCloseNavMenu} />
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none"
                        }}>
                        {APP_NAME}
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        {pages.map(page => (
                            <Button
                                key={page.id}
                                onClick={() => handleCloseNavMenuButtonClick(page)}
                                sx={{ my: 2, color: "white", display: "block" }}>
                                {page.displayName}
                            </Button>
                        ))}
                    </Box>
                    {props.isLoggedIn && (
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="View settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar
                                        alt={props.userName}
                                        src={AvatarImage}
                                        title={`Welcome back, ${props.userName}`}
                                    />
                                </IconButton>
                            </Tooltip>
                            <UserMenu
                                settings={settings}
                                anchor={anchorElUser}
                                onClose={handleCloseUserMenu}
                            />
                        </Box>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};
