import * as React from "react";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export interface UserMenuSetting {
    id: string;
    displayName: string;
    icon: React.ReactNode;
    onClick: () => void;
}

export interface UserMenuProps {
    settings: UserMenuSetting[];
    anchor: null | HTMLElement;
    onClose: () => void;
}

export const UserMenu: React.FunctionComponent<UserMenuProps> = (props: UserMenuProps) => {
    const handleOnItemClick = (setting: UserMenuSetting) => {
        setting.onClick();
        props.onClose();
    };

    return (
        <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={props.anchor}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right"
            }}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right"
            }}
            open={Boolean(props.anchor)}
            onClose={props.onClose}>
            {props.settings.map(setting => (
                <MenuItem key={setting.id} onClick={() => handleOnItemClick(setting)}>
                    <Typography textAlign="center">{setting.displayName}</Typography>
                </MenuItem>
            ))}
        </Menu>
    );
};
