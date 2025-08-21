import { useParams, useLocation } from "react-router-dom";
import { useState } from "react";
import { TopicPreviewSection } from "../../components/Meeting/TopicPreviewSection";
import { NonProfileHeader } from "../../components/NonProfileHeader";
import {
  useGetMeetingTopics,
  useMeetingDetail,
} from "../../hooks/useClubMeeting";
import { format, parseISO } from "date-fns";
import Modal from "../../components/Modal";

const MeetingTopicListPage = () => {
  const { meetingId } = useParams<{ meetingId: string }>();
  const location = useLocation();
  const { title, meetingTime } =
    (location.state as { title: string; meetingTime: string }) || {};

  const meetId = Number(meetingId ?? 0);

  const dateStr = meetingTime
    ? format(parseISO(meetingTime), "yyyy.MM.dd")
    : "날짜 정보 없음";
  const headerTitle = `${dateStr} | ${title || "모임 정보 없음"}`;

  const [modalInfo, setModalInfo] = useState({ show: false, message: "" });

  const { data: topicsResult, isLoading: areTopicsLoading } =
    useGetMeetingTopics(meetId);
  const { data: meetingDetails, isLoading: areDetailsLoading } =
    useMeetingDetail(meetId);

  const handleUpdateSuccess = (message: string) => {
    setModalInfo({ show: true, message });
  };

  const closeModal = () => {
    setModalInfo({ show: false, message: "" });
  };

  if (areTopicsLoading || areDetailsLoading) {
    return <div className="p-4 text-center">로딩 중...</div>;
  }

  if (!topicsResult || !meetingDetails) {
    return <div className="p-4 text-center">모임 데이터를 불러올 수 없습니다.</div>;
  }

  const topics = topicsResult.topics;
  const numberOfTeams = meetingDetails.teams.length;

  return (
    <div className="mx-auto px-10 space-y-5">
      <Modal
        isOpen={modalInfo.show}
        title={modalInfo.message}
        onBackdrop={closeModal}
        buttons={[{ label: "확인", onClick: closeModal, variant: "primary" }]}
      />
      <NonProfileHeader title={headerTitle} />
      {topics.length > 0 ? (
        <TopicPreviewSection
          previews={topics}
          meetingId={meetId}
          numberOfTeams={numberOfTeams}
          onUpdateSuccess={handleUpdateSuccess}
        />
      ) : (
        <div className="text-center text-gray-500 pt-10">
          <p>등록된 발제가 없습니다.</p>
        </div>
      )}
    </div>
  );
};

export default MeetingTopicListPage;
