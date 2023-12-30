// this is a simply dialog not a page thats why  i am taking this page as a client component

"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import useMount from "@/hooks/useMount";
import { CreatePostSchema } from "@/lib/formSchemas";
import { usePathname, useRouter } from "next/navigation";
import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UploadButton } from "@/lib/uploadthing";
import { createPostHandler } from "@/serverActions/createPost";
import ApiLoader from "@/app/components/ApiLoader";
interface CreatePageProps {}
const CreatePage: FC<CreatePageProps> = (): JSX.Element => {
  const pathname = usePathname();
  const [apiLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const isMount = useMount();
  const isCreatePage = pathname === "/dashboard/create";

  const form = useForm<z.infer<typeof CreatePostSchema>>({
    resolver: zodResolver(CreatePostSchema),
    defaultValues: {
      caption: "",
      fileURL: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof CreatePostSchema>) => {
    setIsLoading(true);
    const res = await createPostHandler(values);
    setIsLoading(false);
    if (res) {
      return toast.error(res.message);
    }
  };
  const fileURL = form.watch("fileURL");
  if (!isMount) return <></>;
  //   endpoint="serverImage"
  return (
    <div>
      <Dialog
        open={isCreatePage}
        onOpenChange={(open) => !open && router.back()}
      >
        <ApiLoader isLoading={apiLoading} />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Post</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              {!!fileURL ? (
                <div className="h-96 md:h-[450px] overflow-hidden rounded-md">
                  <AspectRatio ratio={1 / 1} className="relative h-full">
                    <Image
                      src={fileURL}
                      alt="Post preview"
                      fill
                      className="rounded-md object-cover"
                    />
                  </AspectRatio>
                </div>
              ) : (
                <>
                  <FormField
                    control={form.control}
                    name="fileURL"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel htmlFor="picture">Picture</FormLabel>
                        <FormControl>
                          {/* <UploadButton */}
                          {/* <FileUpload
                            endpoint="serverImage"
                            value={field.value}
                            onChange={field.onChange}
                            isLoading={isLoading || apiLoading}
                          /> */}
                          <UploadButton
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) => {
                              form.setValue("fileURL", res[0].url);
                              toast.success("Upload complete");
                            }}
                            onUploadError={(error: Error) => {
                              console.error(error);
                              toast.error("Upload failed");
                            }}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  ></FormField>
                </>
              )}
              {!!fileURL ? (
                <FormField
                  control={form.control}
                  name="caption"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="caption">Caption</FormLabel>
                      <FormControl>
                        <Input
                          type="caption"
                          id="caption"
                          placeholder="write a caption ..."
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                ></FormField>
              ) : (
                <></>
              )}
              <Button type="submit" disabled={form.formState.isSubmitting}>
                Create Post
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreatePage;
