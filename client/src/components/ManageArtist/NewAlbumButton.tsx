import React from "react";
import Button from "components/common/Button";
import { useCreateTrackGroupMutation } from "queries";
import { useTranslation } from "react-i18next";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { once } from "lodash";
import { v4 as uuid } from "uuid";

interface NewAlbumButtonProps extends React.PropsWithChildren {
  artist: Pick<Artist, "id" | "userId">;
}

export function NewAlbumButton(props: NewAlbumButtonProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { mutateAsync: createTrackGroup, isPending } =
    useCreateTrackGroupMutation();

  const handleClick = React.useCallback(
    once(async () => {
      const newAlbum = await createTrackGroup({
        trackGroup: {
          title: "",
          urlSlug: `mi-temp-slug-new-album-${uuid()}`,
          artistId: props.artist.id,
        },
      });

      navigate(
        `/manage/artists/${props.artist.id}/release/${newAlbum.result.id}`
      );
    }),
    []
  );

  return (
    <Button
      compact
      transparent
      startIcon={<FaPlus />}
      variant="dashed"
      collapsible
      isLoading={isPending}
      onClick={handleClick}
    >
      {props.children ?? t("artist.addNewAlbum")}
    </Button>
  );
}
