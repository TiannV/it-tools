import { ArrowsShuffle } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Jetbrains',
  path: '/jetbrains',
  description: '',
  keywords: ['jetbrains'],
  component: () => import('./jetbrains.vue'),
  icon: ArrowsShuffle,
  createdAt: new Date('2024-05-07'),
});
