# How to use the service template.

1. Clone service-template locally

 `git clone [path-to-service-template] [path-to-new-repository]`

2. Create new repository on AWS.

 `aws codecommit create-repository --repository-name MyProjecRepo --repository-description "Write a description about your project"`

 AWS will respond with information about the new repository. Copy the provided _cloneUrlHttp_.

3. Set the remotes.

 `cd [path-to-new-repository]`

 `git remote set-url origin _cloneUrlHttp_`

 `git remote add service-template https://git-codecommit.us-east-1.amazonaws.com/v1/repos/service-template`

4. Do initial push to AWS

  `git push origin master`

When getting updates from service-template, create a feature branch first, and then only merge in desired updates to master.
