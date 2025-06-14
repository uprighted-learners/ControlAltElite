export const API = "http://localhost:4000";

export const API_LOGIN = `${API}/user/login`;

export const API_REGISTER = `${API}/user/register`;

export const API_MENTOR_PROFILE = `${API}/user/mentor/update`;

export const API_DELETE_MENTOR = `${API}/user/delete`;

export const API_VIEW_MENTOR_MATCH = `${API}/match/view-matches`;

export const API_VIEW_PENDING_REQUESTS = `${API}/match/view-requests`;

export const API_MENTEE_PROFILE = `${API}/user/mentee/update`;

export const API_VIEW_MENTORS = `${API}/user/mentor/view-all`;

export const API_ACCEPT_REQUEST = `${API}/match/accept`;

export const API_REJECT_REQUEST = `${API}/match/deny`;

export const API_ADMIN_UPDATE_MENTOR = `${API}/admin/mentor/update`;

export const API_ADMIN_DELETE_MENTOR = `${API}/admin/mentor/delete`;

export const API_REQUEST_MENTOR = `${API}/match/request`;

export const API_MENTEE_PROFILE_PREVIEW = `${API}/user/mentee/profile`;

export const API_MENTOR_PROFILE_PREVIEW = `${API}/user/mentor/profile`;

// Add the S3 upload URL endpoint
export const API_GET_UPLOAD_URL = `${API}/geturl`;