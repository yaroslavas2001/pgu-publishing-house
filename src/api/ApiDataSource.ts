import { WebApiService } from './plugins/webApiService';
import AuthService from './plugins/services/AuthService';
//модельки

import AuthorService from './plugins/services/AuthorService';
import FacultyService from './plugins/services/FacultyService';
import DepartmentService from './plugins/services/DepartmentService';
import ReviewerService from './plugins/services/ReviewerService';
import PublicationService from './plugins/services/PublicationService';
import FileService from './plugins/services/FileService';
import PublicationAuthorService from './plugins/services/PublicationAuthorService';
import ReviewService from './plugins/services/ReviewService';


export default class ApiDataSource {
	webApiService: WebApiService;
	AuthService: AuthService
	AuthorService: AuthorService
	FacultyService: FacultyService
	DepartmentService: DepartmentService
	ReviewerService: ReviewerService
	PublicationService: PublicationService
	FileService: FileService
	PublicationAuthorService:PublicationAuthorService
	ReviewService:ReviewService
	constructor(webApiUrl: string) {
		this.webApiService = new WebApiService(webApiUrl);
		this.AuthService = new AuthService(this.webApiService);
		this.AuthorService = new AuthorService(this.webApiService);
		this.FacultyService = new FacultyService(this.webApiService)
		this.DepartmentService = new DepartmentService(this.webApiService)
		this.ReviewerService = new ReviewerService(this.webApiService)
		this.PublicationService = new PublicationService(this.webApiService)
		this.FileService = new FileService(this.webApiService)
		this.PublicationAuthorService=new PublicationAuthorService(this.webApiService)
		this.ReviewService=new ReviewService(this.webApiService)
	}
}