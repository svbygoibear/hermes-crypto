import * as React from "react";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export interface PageMenuItem {
    id: string;
    displayName: string;
    onClick: () => void;
}

export interface PageMenuProps {
    items: PageMenuItem[];
    anchor: null | HTMLElement;
    onClose: () => void;
}

export const PageMenu: React.FunctionComponent<PageMenuProps> = (props: PageMenuProps) => {
    const handleOnItemClick = (item: PageMenuItem) => {
        item.onClick();
        props.onClose();
    };

    return (
        <Menu
            id="menu-appbar"
            anchorEl={props.anchor}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
            }}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "left"
            }}
            open={Boolean(props.anchor)}
            onClose={props.onClose}
            sx={{
                display: { xs: "block", md: "none" }
            }}>
            {props.items.map(page => (
                <MenuItem key={page.id} onClick={() => handleOnItemClick(page)}>
                    <Typography textAlign="center">{page.displayName}</Typography>
                </MenuItem>
            ))}
        </Menu>
    );
};
