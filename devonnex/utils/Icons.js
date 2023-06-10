"use client";

import React from "react";
import { v4 as uuidv4 } from "uuid";
import { IonIcon } from "@ionic/react";
import {
  time,
  flash,
  location,
  star,
  chevronDown,
  people,
  arrowBack,
  arrowForward,
  timeOutline,
  sendOutline,
  callOutline,
  checkmarkCircle,
  personAddOutline,
  mailOutline,
  chevronForward,
  mailOpenOutline,
  documentTextOutline,
  pricetagOutline,
  shareSocialOutline,
  shieldCheckmarkOutline,
  readerOutline,
  ellipsisHorizontalOutline,
  pencilOutline,
  refreshOutline,
  trashBinOutline,
  cashOutline,
  starOutline,
  closeOutline,
  logoGoogle,
  logoApple,
  logoFacebook,
  gridOutline,
  menuOutline,
  chatboxEllipsesOutline,
  checkmarkDoneOutline,
  constructOutline,
  eyeOutline,
  listOutline,
  trendingDownOutline,
  trendingUpOutline,
  openOutline,
  chatboxEllipses,
  rocketOutline,
  arrowUp,
  searchOutline,
  duplicateOutline,
  downloadOutline,
  logoBehance,
  logoDiscord,
  logoSlack,
  logoTwitter,
} from "ionicons/icons";

// Custom icons
const createIconComponent = (icon) => () => {
  const iconKey = uuidv4();
  return <IonIcon icon={icon} aria-hidden="true" key={iconKey} />;
};

export const SendOutline = createIconComponent(sendOutline);
export const LogoBehance = createIconComponent(logoBehance);
export const LogoSlack = createIconComponent(logoSlack);
export const LogoDiscord = createIconComponent(logoDiscord);
export const LogoTwitter = createIconComponent(logoTwitter);
export const DuplicateOutline = createIconComponent(duplicateOutline);
export const DownloadOutline = createIconComponent(downloadOutline);
export const MenuOutline = createIconComponent(menuOutline);
export const SearchOutline = createIconComponent(searchOutline);
export const LogoFacebook = createIconComponent(logoFacebook);
export const ArrowUp = createIconComponent(arrowUp);
export const RocketOutline = createIconComponent(rocketOutline);
export const ChatboxEllipses = createIconComponent(chatboxEllipses);
export const OpenOutline = createIconComponent(openOutline);
export const ChatboxEllipsesOutline = createIconComponent(
  chatboxEllipsesOutline
);
export const CheckmarkDoneOutline = createIconComponent(checkmarkDoneOutline);
export const ConstructOutline = createIconComponent(constructOutline);
export const EyeOutline = createIconComponent(eyeOutline);
export const ListOutline = createIconComponent(listOutline);
export const TrendingDownOutline = createIconComponent(trendingDownOutline);
export const TrendingUpOutline = createIconComponent(trendingUpOutline);
export const GridOutline = createIconComponent(gridOutline);
export const EllipsisHorizontalOutline = createIconComponent(
  ellipsisHorizontalOutline
);
export const TimeOutline = createIconComponent(timeOutline);
export const CloseOutline = createIconComponent(closeOutline);
export const PencilOutline = createIconComponent(pencilOutline);
export const RefreshOutline = createIconComponent(refreshOutline);
export const TrashBinOutline = createIconComponent(trashBinOutline);
export const ArrowForward = createIconComponent(arrowForward);
export const StarOutline = createIconComponent(starOutline);
export const CashOutline = createIconComponent(cashOutline);
export const ArrowBack = createIconComponent(arrowBack);
export const ReadOutline = createIconComponent(readerOutline);
export const Time = createIconComponent(time);
export const Flash = createIconComponent(flash);
export const ChevronDown = createIconComponent(chevronDown);
export const MailOutline = createIconComponent(mailOutline);
export const ChevronForward = createIconComponent(chevronForward);
export const Star = createIconComponent(star);
export const LogoApple = createIconComponent(logoApple);
export const LogoGoogle = createIconComponent(logoGoogle);
export const Location = createIconComponent(location);
export const People = createIconComponent(people);
export const CallOutline = createIconComponent(callOutline);
export const CheckmarkCircle = createIconComponent(checkmarkCircle);
export const PersonAddOutline = createIconComponent(personAddOutline);
export const MailOpenOutline = createIconComponent(mailOpenOutline);
export const DocumentTextOutline = createIconComponent(documentTextOutline);
export const PricetagOutline = createIconComponent(pricetagOutline);
export const ShareSocialOutline = createIconComponent(shareSocialOutline);
export const ShieldCheckmarkOutline = createIconComponent(
  shieldCheckmarkOutline
);
