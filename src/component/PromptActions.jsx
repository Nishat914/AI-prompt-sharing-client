"use client";

import { useEffect, useState } from "react";
import { AlertDialog, Button, FieldError, Input, Label, Modal, Surface, TextArea, TextField, TextFieldContext  , Select, ListBox, Table} from "@heroui/react";
import { BsBookmarksFill } from "react-icons/bs";
import { FaCopy, FaStar } from "react-icons/fa";
import { MdOutlineReviews, MdReport } from "react-icons/md";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function PromptActions({
  prompt,
  session,
  isPremiumLocked,
}) {
  const [bookmarked, setBookmarked] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  

    const router = useRouter();

  useEffect(() => {
    if (!session?.user?.email) return;

    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/bookmarks/${prompt._id}/${session.user.email}`
    )
      .then((res) => res.json())
      .then((data) => setBookmarked(data.bookmarked));
  }, [prompt._id, session]);

  const handleBookmark = async () => {
    if (!session?.user?.email) {
      toast.error("Please login first");
      return;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/bookmarks`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          promptId: prompt._id,
          userEmail: session.user.email,
        }),
      }
    );

    const data = await res.json();

    setBookmarked(data.bookmarked);
    toast.success(data.message);
  };
  const handleCopy = async () => {
        try {
            // Copy to clipboard
            await navigator.clipboard.writeText(prompt.content);

            // Increase copy count
            await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/prompts/copy/${prompt._id}`,
            {
                method: "PATCH",
            }
            );

            toast.success("Prompt copied successfully!");
        } catch (error) {
            toast.error("Failed to copy prompt");
        }
        router.refresh();
    };

    const handleReview = async (e) => {
        e.preventDefault();

        if (rating === 0) {
            return toast.error("Please select a rating.");
        }

        if (!comment.trim()) {
            return toast.error("Please write your review.");
        }

        const review = {
            promptId: prompt._id,
            userName: session.user.name,
            userEmail: session.user.email,
            userImage: session.user.image,
            rating,
            comment,
        };

        console.log(review)

        try {
            const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/reviews`,
            {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(review),
            }
            );

            const data = await res.json();

            if (res.ok) {
            toast.success("Review submitted successfully!");

            // Reset form
            setRating(0);
            setComment("");

            // Reload reviews
            router.refresh();
            } else {
            toast.error(data.message || "Failed to submit review.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong.");
        }
    };

    const handleReport = async (e) => {
        e.preventDefault();

        if (!reason) {
          return toast.error(
            "Please select a report reason."
          );
        }

        const report = {
        promptId: prompt._id,
        promptTitle: prompt.title,

        userName: session.user.name,
        userEmail: session.user.email,

        reason,
        description,

        status: "pending",
        createdAt: new Date(),
      };

        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/reports`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(report),
            }
          );

          const data = await res.json();

          if (res.ok) {
            toast.success("Report submitted.");

            setReason("");
            setDescription("");

            router.refresh();
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          toast.error("Something went wrong.");
        }
    };

  return (
    <div className="flex flex-wrap gap-3">
      <Button
        onPress={handleBookmark}
        className={
          bookmarked
            ? "bg-yellow-500 text-white"
            : "bg-[#3D2C24]"
        }
      >
        <BsBookmarksFill />
      </Button>

      <Button
        className="bg-[#3D2C24]"
        isDisabled={isPremiumLocked}
         onPress={handleCopy}
      >
        <FaCopy /> Copy
      </Button>
      <Modal>
      
                <Button
                    className="bg-[#3D2C24]"
                    isDisabled={isPremiumLocked}
                >
                    <MdOutlineReviews /> Review
                </Button>
      
                <Modal.Backdrop>
                    <Modal.Container placement="auto">
                        <Modal.Dialog className="sm:max-w-xl">
                            <Modal.CloseTrigger />
                            <Modal.Header>
                                <Modal.Heading>Add My Review</Modal.Heading>
                            </Modal.Header>
                                <Modal.Body className="p-6">
                                    <Surface variant="default">
                                        <form onSubmit={handleReview} className="p-6 space-y-5">

                                        <TextField
                                            name="name"
                                            defaultValue={session?.user?.name}
                                            isReadOnly
                                        >
                                            <Label>Name</Label>
                                            <Input className="w-full bg-mauve-200 text-mauve-700" />
                                        </TextField>

                                        <TextField
                                            name="email"
                                            defaultValue={session?.user?.email}
                                            isReadOnly
                                        >
                                            <Label>Email</Label>
                                            <Input className="w-full bg-mauve-200 text-mauve-700" />
                                        </TextField>

                                        <div>
                                            <Label className="mb-2 block">
                                            Rating
                                            </Label>

                                            <div className="flex gap-2 text-3xl">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <FaStar
                                                key={star}
                                                onClick={() => setRating(star)}
                                                className={`cursor-pointer transition ${
                                                    star <= rating
                                                    ? "text-yellow-400"
                                                    : "text-gray-300"
                                                }`}
                                                />
                                            ))}
                                            </div>
                                        </div>

                                        <TextField
                                            name="comment"
                                            isRequired
                                        >
                                            <Label>Review</Label>
                                            <TextArea
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            placeholder="Write your review..."
                                            />
                                        </TextField>

                                        <Button
                                            type="submit"
                                            className="w-full bg-[#5e4c3d]"
                                        >
                                            Submit Review
                                        </Button>

                                        </form>
                                    </Surface>
                                </Modal.Body>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
      </Modal>

      {/* <Button
        className="bg-[#3D2C24]"
        isDisabled={isPremiumLocked}
      >
        <MdOutlineReviews /> Review
      </Button> */}

      <Modal>

          <Button
            className="bg-[#3D2C24]"
            
          >
            <MdReport /> Report
          </Button>

          <Modal.Backdrop>
            <Modal.Container placement="auto">
              <Modal.Dialog className="sm:max-w-xl">

                <Modal.CloseTrigger />

                <Modal.Header>
                  <Modal.Heading>
                    Report Prompt
                  </Modal.Heading>
                </Modal.Header>

                <Modal.Body className="p-6">

                  <Surface variant="default">

                    <form
                      onSubmit={handleReport}
                      className="p-6 space-y-5"
                    >

                      <TextField
                        name="name"
                        defaultValue={session?.user?.name}
                        isReadOnly
                      >
                        <Label>Name</Label>
                        <Input className="w-full bg-mauve-200 text-mauve-700" />
                      </TextField>

                      <TextField
                        name="email"
                        defaultValue={session?.user?.email}
                        isReadOnly
                      >
                        <Label>Email</Label>
                        <Input className="w-full bg-mauve-200 text-mauve-700" />
                      </TextField>

                      {/* Report Reason */}

                      <div className="space-y-2">

                        <Label>Report Reason</Label>

                        <select
                          value={reason}
                          onChange={(e) => setReason(e.target.value)}
                          className="w-full rounded-xl border border-default-300 bg-mauve-200 px-3 py-3 text-mauve-700 outline-none"
                          required
                        >
                          <option value="">
                            Select a reason
                          </option>

                          <option value="Inappropriate Content">
                            Inappropriate Content
                          </option>

                          <option value="Spam">
                            Spam
                          </option>

                          <option value="Copyright Violation">
                            Copyright Violation
                          </option>

                          <option value="Misleading Information">
                            Misleading Information
                          </option>

                          <option value="Other">
                            Other
                          </option>

                        </select>

                      </div>

                      {/* Description */}

                      <TextField name="description">

                        <Label>
                          Description (Optional)
                        </Label>

                        <TextArea
                          value={description}
                          onChange={(e) =>
                            setDescription(e.target.value)
                          }
                          placeholder="Write additional details..."
                        />

                      </TextField>

                      <Button
                        type="submit"
                        className="w-full bg-[#5e4c3d]"
                      >
                        Submit Report
                      </Button>

                    </form>

                  </Surface>

                </Modal.Body>

              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>

      </Modal>
    </div>
  );
}