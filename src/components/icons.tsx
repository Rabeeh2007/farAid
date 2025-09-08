import type { SVGProps } from 'react';
import { HeartPulse } from 'lucide-react';

export const Icons = {
  Logo: (props: SVGProps<SVGSVGElement>) => (
    <HeartPulse {...props} />
  ),
};
