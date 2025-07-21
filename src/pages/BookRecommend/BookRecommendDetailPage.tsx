import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StarRating from "../../components/BookRecommend/StarRating";
import type { RecommendationDto } from "../../types/dto";
import BookRecommendDetailCard from "../../components/BookRecommend/BookRecommendDetailCard";
import type { useRecommendDetail } from "../../hooks/useRecommend";
import { dummyRecommendDetail } from "./DummyRecommendDetail";

const BookRecommendDetailPage = () => {
  // const { clubId, recommendId } = useParams();
  const navigate = useNavigate();
  // const { data, isLoading, isError, error, refetch } = useRecommendDetail(
  //   clubId,
  //   recommendId
  // );

  // if (isLoading) return <Spinner />; // 로딩 중일 때, 처리
  // if (isError) return <ErrorBox err={error} />; // 에러 처리

  const data = dummyRecommendDetail;

  return <BookRecommendDetailCard recommendDetail={data} />;
};

export default BookRecommendDetailPage;
