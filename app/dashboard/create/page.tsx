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
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import useMount from "@/hooks/useMount";
import { CreatePostSchema } from "@/lib/formSchemas";
import { usePathname, useRouter } from "next/navigation";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
interface CreatePageProps {}
const CreatePage: FC<CreatePageProps> = (): JSX.Element => {
  const pathname = usePathname();
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
  const fileURL = form.watch("fileURL");
  if (!isMount) return <></>;
  //   endpoint="serverImage"
  return (
    <div>
      <Dialog
        open={isCreatePage}
        onOpenChange={(open) => !open && router.back()}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Post</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form className="space-y-4">
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
                        <FormControl>{/* <UploadButton */}</FormControl>
                      </FormItem>
                    )}
                  ></FormField>
                </>
              )}
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreatePage;
