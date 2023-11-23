import { css } from "@emotion/css";
import React from "react";
import { useTranslation } from "react-i18next";

import UploadImage from "./UploadImage";

const UploadArtistImage: React.FC<{
  existing: Artist;
  imageType: "avatar" | "banner";
  reload: () => Promise<void>;
  height: string;
  width: string;
  maxDimensions: string;
  isLoading?: boolean;
}> = ({ existing, imageType, height, width, maxDimensions, isLoading }) => {
  const { t } = useTranslation("translation", { keyPrefix: "artistForm" });

  const imageUrl =
    imageType === "banner"
      ? existing?.banner?.sizes?.[625]
      : existing?.avatar?.sizes?.[120];

  return (
    <div
      className={css`
        margin-bottom: 1rem;
      `}
    >
      <label>
        <strong>{t(imageType)}</strong>
      </label>
      <div
        className={css`
          position: relative;
          width: ${width};
          min-height: ${height};
        `}
      >
        <UploadImage
          formName={imageType}
          existingCover={imageUrl}
          updatedAt={existing[imageType]?.updatedAt}
          isLoading={isLoading}
        />
      </div>
      <small>{t("dimensionsTip", { maxDimensions })}</small>
    </div>
  );
};

export default UploadArtistImage;
