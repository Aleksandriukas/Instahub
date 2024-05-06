import { createSafeContext, useSafeContext } from "@sirse-dev/safe-context";
import { PostBean } from "../../../beans/PostBean";

type HomeContextType = {
  selectedPost: PostBean | null;
  setSelectedPost: React.Dispatch<React.SetStateAction<PostBean | null>>;
};

export const HomeContext = createSafeContext<HomeContextType>();
