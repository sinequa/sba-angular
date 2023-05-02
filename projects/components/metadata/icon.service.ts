import { Injectable } from '@angular/core';

const FORMAT_MAPPINGS = {
  'fas fa-globe-europe': ['htm', 'html', 'xhtm', 'xhtml', 'mht'],
  'far fa-file-word': ['doc', 'docx', 'docm', 'dot', 'dotx', 'dotm', 'rtf', 'odt', 'ott', 'gdoc'],
  'far fa-file-excel': ['xls', 'xlsx', 'xlt', 'xltx', 'xlsm', 'xltm', 'gsheet', 'ods', 'ots'],
  'far fa-file-powerpoint': ['ppt', 'pptx', 'pptm', 'pps', 'ppsx', 'ppsm', 'pot', 'potx', 'potm', 'odp', 'otp', 'gslides'],
  'far fa-file-pdf': ['pdf'],
  'far fa-file-image': ['jpg', 'jpeg', 'bmp', 'tiff', 'tif', 'gif', 'png'],
  'far fa-file-video': ['mp4', 'flv', 'swf', 'mts', 'divx', 'wmv', 'avi', 'mov', 'mpg', 'mpeg', 'asf', 'rm'],
  'far fa-file-audio': ['mp3', 'wav', 'ogg', 'wma', 'aac', 'm3u'],
  'far fa-file-alt': ['extractslocations', 'filename', 'txt', 'text'],
  'far fa-file-code': ['xml', 'cs', 'java', 'cpp', 'c', 'h', 'hpp', 'js', 'ts'],
  'far fa-file-archive': ['zip', '7zip', '7z', 'rar', 'gz'],
  'fas fa-file-invoice': ['notes', 'quickr'],
  'far fa-envelope': ['email', 'mail', 'msg'],
  'far fa-database': ['mdb', 'odb', 'otb'],
  'fas fa-file-excel': ['xsn', 'gform'],
  'far fa-book': ['one'],
  'fas fa-file-medical-alt': ['odf', 'otf'],
  'far fa-object-group': ['vsdx', 'vsx', 'vtx', 'vdx', 'vssx', 'vstx', 'vsdm', 'vssm', 'vstm', 'vdw', 'vsd', 'vss', 'vst', '*file-odg', 'otg', 'gdraw', 'pub'],
  'far fa-users': ['ldap', 'ad'],
  'fas fa-file-medical': ['mmp', 'mppx']
}

@Injectable({
  providedIn: 'root'
})
export class IconService {

  formatMappings: any;

  constructor() {
  }

  setIcons(icons?: any) {
    this.formatMappings = icons || FORMAT_MAPPINGS;
  }

  getFormatIcon(format: string): string | undefined {
    return Object.keys(this.formatMappings).find(key => this.formatMappings[key].includes(format));
  }
}
