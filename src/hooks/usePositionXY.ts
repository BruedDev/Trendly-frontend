import { useCallback } from 'react';
import type { Position, DistanceCalculation } from '@/types/postionXY';

const usePositionXY = () => {
  const getElementPosition = useCallback((element: HTMLElement | null): Position | null => {
    if (!element) return null;

    const rect = element.getBoundingClientRect();

    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      width: rect.width,
      height: rect.height,
      top: rect.top,
      left: rect.left,
      right: rect.right,
      bottom: rect.bottom
    };
  }, []);

  const calculateDistance = useCallback((
    fromElement: HTMLElement | null,
    toElement: HTMLElement | null
  ): DistanceCalculation | null => {
    const fromPos = getElementPosition(fromElement);
    const toPos = getElementPosition(toElement);

    if (!fromPos || !toPos) return null;

    return {
      from: fromPos,
      to: toPos,
      deltaX: toPos.x - fromPos.x,
      deltaY: toPos.y - fromPos.y,
      distance: Math.sqrt(
        Math.pow(toPos.x - fromPos.x, 2) + Math.pow(toPos.y - fromPos.y, 2)
      ),
      angle: Math.atan2(toPos.y - fromPos.y, toPos.x - fromPos.x)
    };
  }, [getElementPosition]);

  return {
    getElementPosition,
    calculateDistance
  };
};

export default usePositionXY;