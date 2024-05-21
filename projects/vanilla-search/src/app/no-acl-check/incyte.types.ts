import { Results } from '@sinequa/core/web-services';

export interface IncyteResult extends Results {
	nonAclRecords: NonAclRecord[];
} 

export type NonAclRecord = {
    authors: string,
    filename: string,
    treePath: string
}