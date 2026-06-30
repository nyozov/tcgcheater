"use client";

import { useRef, useTransition } from "react";
import {
  Form,
  TextField,
  TextArea,
  Input,
  Label,
  Button,
} from "@heroui/react";
import { createPost } from "./actions";

export function PostForm({ slug }: { slug: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      await createPost(slug, formData);
      formRef.current?.reset();
    });
  };

  return (
    <Form ref={formRef} action={handleSubmit} className="space-y-4 mb-10">
      <TextField name="title" isRequired>
        <Label>Title</Label>
        <Input placeholder="Give your post a title" />
      </TextField>

      <TextField name="description" isRequired>
        <Label>Description</Label>
        <TextArea placeholder="What's on your mind?" rows={4} />
      </TextField>

      <Button type="submit" isDisabled={isPending}>
        {isPending ? "Posting..." : "Post"}
      </Button>
    </Form>
  );
}