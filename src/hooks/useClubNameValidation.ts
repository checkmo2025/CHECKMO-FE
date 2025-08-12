import { useState, useCallback } from 'react';
import { validateClubName } from '../apis/clubValidationApi';

export const useClubNameValidation = () => {
  const [isValidating, setIsValidating] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasManualCheck, setHasManualCheck] = useState(false);

  // 수동 중복검사 함수
  const checkClubName = useCallback(async (clubName: string) => {
    if (!clubName.trim()) {
      setIsDuplicate(null);
      setError(null);
      return;
    }

    setIsValidating(true);
    setError(null);
    setHasManualCheck(true);

    try {
      const duplicateFromServer: boolean = await validateClubName(clubName);
      // 스펙: true = 이미 존재(중복), false = 사용 가능
      setIsDuplicate(duplicateFromServer);
    } catch (err) {
      setError('네트워크 오류가 발생했습니다.');
      setIsDuplicate(null);
    } finally {
      setIsValidating(false);
    }
  }, []);

  // 검증 상태 초기화
  const resetValidation = useCallback(() => {
    setIsDuplicate(null);
    setError(null);
    setIsValidating(false);
    setHasManualCheck(false);
  }, []);

  return {
    isValidating,
    // 파생값: 사용 가능 여부. true: 사용 가능, false: 중복, null: 미검증
    isAvailable: isDuplicate === null ? null : !isDuplicate,
    // 원본값: 서버 의미 그대로. true: 중복, false: 사용 가능, null: 미검증
    isDuplicate,
    // 하위 호환을 위한 alias (기존 UI에서 사용): true: 사용 가능, false: 중복
    validationResult: isDuplicate === null ? null : !isDuplicate,
    error,
    checkClubName,
    resetValidation,
    hasManualCheck,
  };
};
