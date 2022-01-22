import {Avatar} from "@mui/material";
import {GetAvatarUrl} from "./url";
import React from "react";
import {Tooltip} from "@material-ui/core";

export function RenderAvatar(avatarUrl, nickname, aSize, fSize, pTop, margin, border, cursor, tooltip) {
  if (avatarUrl === "" && !tooltip) {
    return (
      <Avatar
        alt={nickname}
        sx={{
          width: aSize,
          height: aSize,
          color:"#222",
          bgcolor: "#cde8fc",
          fontSize: fSize,
          margin: margin,
          paddingTop: pTop,
          cursor: cursor,
          border: border
        }}
      >
        {nickname.substring(0,2)}
      </Avatar>
    )
  } else if (avatarUrl !== "" && !tooltip) {
    return (
      <Avatar
        alt={nickname}
        src={GetAvatarUrl(avatarUrl)}
        sx={{
          width: aSize,
          height: aSize,
          margin: margin,
          cursor: cursor,
          border: border
        }}
      />
    )
  } else if (avatarUrl === "" && tooltip) {
    return (
      <Tooltip title={nickname}>
        <Avatar
          alt={nickname}
          sx={{
            width: aSize,
            height: aSize,
            color:"#222",
            bgcolor: "#cde8fc",
            fontSize: fSize,
            margin: margin,
            paddingTop: pTop,
            cursor: cursor,
            border: border
          }}
        >
          {nickname.substring(0,2)}
        </Avatar>
      </Tooltip>
    )
  } else if (avatarUrl !== "" && tooltip) {
    return (
      <Tooltip title={nickname}>
        <Avatar
          alt={nickname}
          src={GetAvatarUrl(avatarUrl)}
          sx={{
            width: aSize,
            height: aSize,
            margin: margin,
            cursor: cursor,
            border: border
          }}
        />
      </Tooltip>
    )

  }
}
