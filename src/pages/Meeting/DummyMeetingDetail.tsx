import type { MeetingDetailResponse } from "../../types/clubMeeting";

export const DummyMeetingDetail: MeetingDetailResponse = {
  isSuccess: true,
  code: "COMMON200",
  message: "성공입니다.",
  result: {
    meetingId: 501,
    generation: 7,
    tags: "사회",
    title: "1차 정기모임",
    book: {
      title: "넥서스",
      author: "유발하라리",
      imgUrl: "https://example.com/nexus.jpg",
    },
    meetingDate: "2025-06-02T18:00",
    meetingPlace: "제이스 스터디룸",

    topicPreview: [
      {
        topicId: 201,
        content:
          "메노키오의 사례에서 볼 수 있듯이 시대마다 '허용되는 사상'과 '탄압받는 사상'이 존재한다. 현대사회에서 비슷한 사례는 무엇이 있을까?",
        authorInfo: {
          nickname: "닉네임1",
          profileImageUrl: "https://example.com/user1.png",
        },
        selectedTeams: [1, 2, 3], // A조=1, B조=2, C조=3
      },
      {
        topicId: 202,
        content: "이 책에서 가장 인상 깊었던 구절은?",
        authorInfo: {
          nickname: "닉네임2",
          profileImageUrl: "https://example.com/user2.png",
        },
        selectedTeams: [1], // A조만 선택
      },
      {
        topicId: 203,
        content:
          "메노키오의 사례에서 볼 수 있듯이 시대마다 '허용되는 사상'과 '탄압받는 사상'이 존재한다. 현대사회에서 비슷한 사례는 무엇이 있을까?",
        authorInfo: {
          nickname: "닉네임3",
          profileImageUrl: "https://example.com/user1.png",
        },
        selectedTeams: [1, 2, 3], // A조=1, B조=2, C조=3
      },
      {
        topicId: 204,
        content: "이 책에서 가장 인상 깊었던 구절은?",
        authorInfo: {
          nickname: "닉네임4",
          profileImageUrl: "https://example.com/user2.png",
        },
        selectedTeams: [1], // A조만 선택
      },
      {
        topicId: 205,
        content:
          "메노키오의 사례에서 볼 수 있듯이 시대마다 '허용되는 사상'과 '탄압받는 사상'이 존재한다. 현대사회에서 비슷한 사례는 무엇이 있을까?",
        authorInfo: {
          nickname: "닉네임5",
          profileImageUrl: "https://example.com/user1.png",
        },
        selectedTeams: [1, 2, 3], // A조=1, B조=2, C조=3
      },
      {
        topicId: 206,
        content: "이 책에서 가장 인상 깊었던 구절은?",
        authorInfo: {
          nickname: "닉네임6",
          profileImageUrl: "https://example.com/user2.png",
        },
        selectedTeams: [1], // A조만 선택
      },
      {
        topicId: 207,
        content:
          "메노키오의 사례에서 볼 수 있듯이 시대마다 '허용되는 사상'과 '탄압받는 사상'이 존재한다. 현대사회에서 비슷한 사례는 무엇이 있을까?",
        authorInfo: {
          nickname: "닉네임7",
          profileImageUrl: "https://example.com/user1.png",
        },
        selectedTeams: [1, 2, 3], // A조=1, B조=2, C조=3
      },
      {
        topicId: 208,
        content: "이 책에서 가장 인상 깊었던 구절은?",
        authorInfo: {
          nickname: "닉네임8",
          profileImageUrl: "https://example.com/user2.png",
        },
        selectedTeams: [1], // A조만 선택
      },
    ],

    teams: [
      {
        teamNumber: 1, // A조
        topics: [
          {
            topicId: 201,
            content:
              "메노키오의 사례에서 볼 수 있듯이 시대마다 '허용되는 사상'과 '탄압받는 사상'이 존재한다. 현대사회에서 비슷한 사례는 무엇이 있을까?",
            authorInfo: {
              nickname: "닉네임1",
              profileImageUrl: "https://example.com/user1.png",
            },
          },
          {
            topicId: 202,
            content: "이 책에서 가장 인상 깊었던 구절은?",
            authorInfo: {
              nickname: "닉네임2",
              profileImageUrl: "https://example.com/user2.png",
            },
          },
        ],
      },
      {
        teamNumber: 2, // B조
        topics: [
          {
            topicId: 201,
            content:
              "메노키오의 사례에서 볼 수 있듯이 시대마다 '허용되는 사상'과 '탄압받는 사상'이 존재한다. 현대사회에서 비슷한 사례는 무엇이 있을까?",
            authorInfo: {
              nickname: "닉네임1",
              profileImageUrl: "https://example.com/user1.png",
            },
          },
        ],
      },
    ],
  },
};
