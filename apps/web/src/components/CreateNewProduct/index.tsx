import Image from 'next/image';
import ImageUpload from 'components/ImageUpload';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { TextInput, Button, Loader } from '@mantine/core';
import { newProductChangeValue } from 'store/NewProduct';
import { useAppDispatch } from 'store/hooks';
import { useUploadNewProduct } from 'resources/your-products/yourProducts.api';
import { useState } from 'react';
import { useStyles } from './styles';

const fields: { title: string; placeholder: string; field: 'name' | 'price' }[] = [
  { title: 'Title of the product', placeholder: 'Enter title of the product...', field: 'name' },
  { title: 'Price', placeholder: 'Enter price of the product', field: 'price' },
];

const schema = z.object({
  name: z.string().regex(/^[a-zA-Z]{3,35}$/, 'Title should consist of letters only (3 to 35 characters).'),
  price: z
    .string()
    .regex(/^\d+(\.\d+)?$/, 'Price should consist of digits (at least one digit) and can include a decimal point.'),
});

type UploadNewProductParams = z.infer<typeof schema>;

export const CreateNewProduct = () => {
  const { classes } = useStyles();
  const dispatch = useAppDispatch();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [formData, setFormData] = useState(new FormData());
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const {
    mutate: uploadNewProduct,
    isLoading: newProductIsLoading,
  } = useUploadNewProduct();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<UploadNewProductParams>({ resolver: zodResolver(schema), mode: 'onSubmit' });
  const changeInputValue = (e: React.ChangeEvent<HTMLInputElement>, field: 'name' | 'price') => {
    const { value } = e.target;
    dispatch(newProductChangeValue({ key: field, value }));

    if (isFormSubmitted) {
      trigger(field);
    }
  };

  const saveImage = (imageFile: File, imageUrl: string) => {
    formData.append('file', imageFile, imageFile.name);
    setSelectedImage(imageUrl);
  };

  const addNewProduct = async (data :{ name: string, price: string }) => {
    setFormData(new FormData());
    const { name, price } = data;
    formData.append('name', name);
    formData.append('price', price);

    setIsFormSubmitted(true);

    if (selectedImage) {
      return uploadNewProduct(formData, {
        onError: (err) => console.log(err),
      });
    }

    if (!selectedImage) {
      alert('Add image, image required!');
    }
  };

  return (
    <div>
      <h2 className={classes.title}>Create new product</h2>
      <form onSubmit={handleSubmit(addNewProduct)}>
        <div className={classes.uploadImageWrapper}>
          {selectedImage && (
            <div className={classes.imageDownloadWrapper}>
              {newProductIsLoading && (
                <div className={classes.downloadBlur}>
                  <Loader className={classes.loader} color="blue" size="xl" type="dots" />
                </div>
              )}
              <Image className={classes.img} alt="download image" height={180} width={180} src={selectedImage} />
            </div>
          )}
          {!selectedImage && <Image alt="download image" height={180} width={180} src="../images/downloadImage.svg" />}
          <ImageUpload saveImage={saveImage} />
        </div>
        <div className={classes.wrapper}>
          {fields.map(({ title, placeholder, field }) => (
            <TextInput
              className={classes.input}
              {...register(field)}
              key={field}
              size="sm"
              radius="md"
              label={title}
              onChange={(e) => changeInputValue(e, field)}
              placeholder={placeholder}
              labelProps={{ style: { marginBottom: '8px' } }}
              error={errors[field] ? errors[field]?.message : ''}
            />
          ))}
        </div>
        <div className={classes.buttonUploadWrapper}>
          <Button
            disabled={newProductIsLoading}
            className={classes.uploadButton}
            type="submit"
            size="md"
            radius="md"
            mt={34}
          >
            Upload Product
          </Button>
        </div>
      </form>
    </div>
  );
};
