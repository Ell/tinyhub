export enum ErrorCode {
	// code-1
	BlobUnknown = 'BLOB_UNKNOWN',
	// code-2
	BlobUploadInvalid = 'BLOB_UPLOAD_INVALID',
	// code-3
	BlobUploadUnknown = 'BLOB_UPLOAD_UNKNOWN',
	// code-4
	DigestInvalid = 'DIGEST_INVALID',
	// code-5
	ManifestBlobUnknown = 'MANIFEST_BLOB_UNKNOWN',
	// code-6
	ManifestInvalid = 'MANIFEST_INVALID',
	// code-7
	ManifestUnknown = 'MANIFEST_UNKNOWN',
	// code-8
	NameInvalid = 'NAME_INVALID',
	// code-9
	NameUnknown = 'NAME_UNKNOWN',
	// code-10
	SizeInvalid = 'SIZE_INVALID',
	// code-11
	Unauthorized = 'UNAUTHORIZED',
	// code-12
	Denied = 'DENIED',
	// code-13
	Unsupported = 'UNSUPPORTED',
	// code-14
	TooManyRequests = 'TOO_MANY_REQUESTS',
	Unknown = 'UNKNOWN',
}

export class RegistryError extends Error {
	constructor(public readonly code: ErrorCode, public readonly statusCode: number, public readonly message: string = '') {
		super();

		this.name = code;
		this.statusCode = statusCode;

		if (this.message) {
			return;
		}

		switch (code) {
			case ErrorCode.BlobUnknown:
				this.message = 'blob unknown to registry';
				break;
			case ErrorCode.BlobUploadInvalid:
				this.message = 'blob upload invalid';
				break;
			case ErrorCode.BlobUploadUnknown:
				this.message = 'blob upload unknown to registry';
				break;
			case ErrorCode.DigestInvalid:
				this.message = 'provided digest did not match uploaded content';
				break;
			case ErrorCode.ManifestBlobUnknown:
				this.message = 'manifest references a manifest or blob unknown to registry';
				break;
			case ErrorCode.ManifestInvalid:
				this.message = 'manifest invalid';
				break;
			case ErrorCode.ManifestUnknown:
				this.message = 'manifest unknown to registry';
				break;
			case ErrorCode.NameInvalid:
				this.message = 'invalid repository name';
				break;
			case ErrorCode.NameUnknown:
				this.message = 'repository name not known to registry';
				break;
			case ErrorCode.SizeInvalid:
				this.message = 'provided length did not match content length';
				break;
			case ErrorCode.Unauthorized:
				this.message = 'authentication required';
				break;
			case ErrorCode.Denied:
				this.message = 'requested access to the resource is denied';
				break;
			case ErrorCode.Unsupported:
				this.message = 'the operation is unsupported';
				break;
			case ErrorCode.TooManyRequests:
				this.message = 'too many requests';
				break;
			default:
				this.message = 'unknown error';
				break;
		}
	}
}
