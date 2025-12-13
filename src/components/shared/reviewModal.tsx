import { Star } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

/* ---------------------- REVIEW MODAL ---------------------- */
export const ReviewModal = ({
  open,
  loading,
  onClose,
  onSubmit,
}: {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onSubmit: (rating: number, comment: string) => void;
}) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-background w-full max-w-md rounded-xl p-5 space-y-4">
        <h3 className="text-lg font-semibold">Write a Review</h3>

        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              onClick={() => setRating(i)}
              className={`w-6 h-6 cursor-pointer ${
                i <= rating
                  ? "fill-primary text-primary"
                  : "text-muted-foreground"
              }`}
            />
          ))}
        </div>

        <textarea
          className="w-full border rounded-md p-2 text-sm"
          rows={4}
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            disabled={loading || !comment.trim()}
            onClick={() => {
              onSubmit(rating, comment);
              setComment("");
              setRating(5);
            }}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </div>
    </div>
  );
};
