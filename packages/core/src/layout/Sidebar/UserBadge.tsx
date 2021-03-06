/*
 * Copyright 2020 Spotify AB
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { FC, useContext } from 'react';
import { makeStyles } from '@material-ui/core';
import People from '@material-ui/icons/People';
import { SidebarContext } from './config';
import { SidebarItem } from './Items';
import { LoggedUserBadge } from './LoggedUserBadge';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import { BackstageTheme } from '@backstage/theme';
import { SidebarPinStateContext } from './Page';

const ARROW_BUTTON_SIZE = 20;
const useStyles = makeStyles<BackstageTheme, { isPinned: boolean }>(theme => {
  return {
    root: {
      position: 'relative',
    },
    arrowButtonWrapper: {
      position: 'absolute',
      right: 0,
      width: ARROW_BUTTON_SIZE,
      height: ARROW_BUTTON_SIZE,
      top: `calc(50% - ${ARROW_BUTTON_SIZE / 2}px)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '2px 0px 0px 2px',
      background: theme.palette.pinSidebarButton.icon,
      color: theme.palette.pinSidebarButton.background,
      border: 'none',
      outline: 'none',
      cursor: 'pointer',
    },
    arrowButtonIcon: {
      transform: ({ isPinned }) => (isPinned ? 'rotate(180deg)' : 'none'),
    },
  };
});

export const SidebarUserBadge: FC<{}> = () => {
  const { isOpen } = useContext(SidebarContext);
  const { isPinned, toggleSidebarPinState } = useContext(
    SidebarPinStateContext,
  );
  const classes = useStyles({ isPinned });

  const isUserLoggedIn = false;
  return (
    <div className={classes.root}>
      {isUserLoggedIn ? (
        <LoggedUserBadge
          imageUrl="https://via.placeholder.com/200/200"
          name="Victor Viale"
          hideName={!isOpen}
        />
      ) : (
        <SidebarItem icon={People} text="Log in" to="/login" disableSelected />
      )}
      {isOpen && (
        <button
          className={classes.arrowButtonWrapper}
          onClick={toggleSidebarPinState}
        >
          <DoubleArrowIcon
            className={classes.arrowButtonIcon}
            style={{ fontSize: 14 }}
          />
        </button>
      )}
    </div>
  );
};
