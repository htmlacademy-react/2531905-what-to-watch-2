import {useSelector} from 'react-redux';
import type {State} from '@/types/state';

export const useAppSelector = useSelector.withTypes<State>();
