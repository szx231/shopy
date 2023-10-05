import { memo, useState, FC } from 'react';
import { Group, Button, Stack } from '@mantine/core';
import { Dropzone, FileWithPath } from '@mantine/dropzone';

import { accountApi } from 'resources/account';

import { useStyles } from './styles';

type ImageUploadProps = {
  saveImage?: (image: File, imageUrl: string) => void;
};

const ImageUpload: FC<ImageUploadProps> = ({ saveImage }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { classes, cx } = useStyles();

  const { data: account } = accountApi.useGet();

  const { mutate: removeProfileImage } = accountApi.useRemoveAvatar();

  if (!account) return null;

  const isFileSizeCorrect = (file: any) => {
    const oneMBinBytes = 1048576;
    if (file.size / oneMBinBytes > 2) {
      setErrorMessage('Sorry, you cannot upload a file larger than 2 MB.');
      return false;
    }
    return true;
  };

  const isFileFormatCorrect = (file: FileWithPath) => {
    if (['image/png', 'image/jpg', 'image/jpeg'].includes(file.type)) return true;
    setErrorMessage('Sorry, you can only upload JPG, JPEG or PNG Images.');
    return false;
  };

  const handleImageUpload = async ([imageFile]: FileWithPath[]) => {
    setErrorMessage(null);

    if (isFileFormatCorrect(imageFile) && isFileSizeCorrect(imageFile) && imageFile) {
      const body = new FormData();
      body.append('file', imageFile, imageFile.name);

      const imageUrl = URL.createObjectURL(imageFile);

      if (saveImage) {
        saveImage(imageFile, imageUrl);
      }
    }
  };

  const handlerImageRemove = async () => {
    setErrorMessage(null);
    await removeProfileImage();
  };

  return (
    <>
      <Stack>
        <Group align="flex-start" spacing={32}>
          <Stack align="center" spacing={10}>
            <Dropzone
              name="avatarUrl"
              accept={['image/png', 'image/jpg', 'image/jpeg']}
              onDrop={handleImageUpload}
              classNames={{
                root: classes.dropzoneRoot,
              }}
            >
              <label
                className={cx(classes.browseButton, {
                  [classes.error]: errorMessage,
                })}
              >
                <button className={classes.uploadPhotoButton} type="button">
                  Upload Photo
                </button>
              </label>
            </Dropzone>
            {account.avatarUrl && (
              <Button type="submit" variant="subtle" onClick={handlerImageRemove} size="sm">
                Remove
              </Button>
            )}
          </Stack>
        </Group>
      </Stack>
      {!!errorMessage && <p className={classes.errorMessage}>{errorMessage}</p>}
    </>
  );
};

export default memo(ImageUpload);
